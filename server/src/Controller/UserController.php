<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;
use OpenApi\Attributes as OA;
use App\Enum\UserRole;

#[Route('/api/user')]
#[OA\Tag(name: 'User')]
final class UserController extends AbstractController
{
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
    public function updatePassword(): Response
    {
        $user = $this->getUser();

        return $this->json([
            'id' => $user->getId(),
            'username' => $user->getUserIdentifier(),
            'roles' => $user->getRoles()
        ]);
    }
}