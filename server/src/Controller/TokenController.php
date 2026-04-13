<?php
// src/Controller/TokenController.php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\Security\Core\User\UserInterface;

class TokenController extends AbstractController
{
    #[Route('/api/token_check', name: 'api_token_check', methods: ['GET', 'POST'])]
    public function checkToken(): JsonResponse
    {
        // If we reach this point, the token is valid (authentication passed)
        $user = $this->getUser();

        if (!$user instanceof UserInterface) {
            return $this->json([
                'valid' => false,
                'message' => 'Invalid token'
            ], 401);
        }

        return $this->json([
            'valid' => true,
            'user' => [
                'username' => $user->getUserIdentifier(),
                'roles' => $user->getRoles(),
            ]
        ]);
    }
}
