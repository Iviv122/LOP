<?php

namespace App\Controller;

use App\Entity\User;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use Symfony\Component\Routing\Attribute\Route;
use OpenApi\Attributes as OA;

#[Route('/api/user')]
#[OA\Tag(name: 'User')]
final class UserController extends AbstractController
{

    private UserPasswordHasherInterface $passwordHasher;
    private EntityManagerInterface $em;

    public function __construct(EntityManagerInterface $em, UserPasswordHasherInterface $passwordHasher)
    {
        $this->em = $em;
        $this->passwordHasher = $passwordHasher;
    }

    #[Route('/', name: 'app_user', methods: ['GET'])]
    #[OA\Get(
        path: '/api/user/',
        summary: 'Get current user information',
        description: 'Returns the authenticated user\'s details including ID, username, and roles',
        tags: ['User'],
        responses: [
            new OA\Response(
                response: 200,
                description: 'Successfully retrieved user information',
                content: new OA\JsonContent(
                    properties: [
                        new OA\Property(
                            property: 'id',
                            type: 'integer',
                            example: 1
                        ),
                        new OA\Property(
                            property: 'username',
                            type: 'string',
                            example: 'admin'
                        ),
                        new OA\Property(
                            property: 'roles',
                            type: 'array',
                            items: new OA\Items(
                                type: 'string',
                                enum: ['ROLE_ADMIN', 'ROLE_USER']
                            ),
                            example: ['ROLE_USER']
                        )
                    ]
                )
            ),
            new OA\Response(
                response: 401,
                description: 'Unauthorized - User not authenticated',
                content: new OA\JsonContent(
                    properties: [
                        new OA\Property(
                            property: 'message',
                            type: 'string',
                            example: 'Authentication required'
                        )
                    ]
                )
            )
        ],
        security: [
            ['Bearer' => []]
        ]
    )]
    public function index(): Response
    {
        $user = $this->getUser();

        return $this->json([
            'id' => $user->getId(),
            'username' => $user->getUserIdentifier(),
            'roles' => $user->getRoles()
        ]);
    }

    #[Route('/new_password', name: 'app_update_password', methods: ['POST'])]
    #[OA\Post(
        path: "/new_password",
        summary: "Update user password",
        requestBody: new OA\RequestBody(
            required: true,
            content: new OA\JsonContent(
                required: ["password"],
                properties: [
                    new OA\Property(property: "password", type: "string", example: "newStrongPassword123")
                ]
            )
        ),
        responses: [
            new OA\Response(
                response: 200,
                description: "Password updated successfully",
                content: new OA\JsonContent(
                    properties: [
                        new OA\Property(property: "id", type: "integer"),
                        new OA\Property(property: "username", type: "string"),
                        new OA\Property(property: "roles", type: "array", items: new OA\Items(type: "string"))
                    ]
                )
            )
        ]
    )]
    public function updatePassword(Request $request): Response
    {
        $data = $request->getPayload();
        if(!$data->has("password")){
            return $this->json(['error' => 'Password is required'], 400);
        }
        $plainPassword = $data->get("password");

        /** @var User|null $user */
        $user = $this->getUser();

        $hashedPassword = $this->passwordHasher->hashPassword($user, $plainPassword);

        $user->setPassword($hashedPassword);

        $this->em->persist($user);
        $this->em->flush();

        return $this->json([
            "status"=> "success",
        ]);
    }
}