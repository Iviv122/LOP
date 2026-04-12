<?php

namespace App\Controller;

use App\Entity\LinkCollection;
use App\Form\LinkCollectionType;
use App\Repository\LinkCollectionRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

#[Route('/link_collection')]
final class LinkCollectionController extends AbstractController
{
    #[Route(name: 'app_link_collection_index', methods: ['GET'])]
    public function index(LinkCollectionRepository $linkCollectionRepository): Response
    {
        return $this->render('link_collection/index.html.twig', [
            'link_collections' => $linkCollectionRepository->findAll(),
        ]);
    }

    #[Route('/new', name: 'app_link_collection_new', methods: ['GET', 'POST'])]
    public function new(Request $request, EntityManagerInterface $entityManager): Response
    {
        $linkCollection = new LinkCollection();
        $form = $this->createForm(LinkCollectionType::class, $linkCollection);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $entityManager->persist($linkCollection);
            $entityManager->flush();

            return $this->redirectToRoute('app_link_collection_index', [], Response::HTTP_SEE_OTHER);
        }

        return $this->render('link_collection/new.html.twig', [
            'link_collection' => $linkCollection,
            'form' => $form,
        ]);
    }

    #[Route('/{id}', name: 'app_link_collection_show', methods: ['GET'])]
    public function show(LinkCollection $linkCollection): Response
    {
        return $this->render('link_collection/show.html.twig', [
            'link_collection' => $linkCollection,
        ]);
    }

    #[Route('/{id}/edit', name: 'app_link_collection_edit', methods: ['GET', 'POST'])]
    public function edit(Request $request, LinkCollection $linkCollection, EntityManagerInterface $entityManager): Response
    {
        $form = $this->createForm(LinkCollectionType::class, $linkCollection);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $entityManager->flush();

            return $this->redirectToRoute('app_link_collection_index', [], Response::HTTP_SEE_OTHER);
        }

        return $this->render('link_collection/edit.html.twig', [
            'link_collection' => $linkCollection,
            'form' => $form,
        ]);
    }

    #[Route('/{id}', name: 'app_link_collection_delete', methods: ['POST'])]
    public function delete(Request $request, LinkCollection $linkCollection, EntityManagerInterface $entityManager): Response
    {
        if ($this->isCsrfTokenValid('delete'.$linkCollection->getId(), $request->getPayload()->getString('_token'))) {
            $entityManager->remove($linkCollection);
            $entityManager->flush();
        }

        return $this->redirectToRoute('app_link_collection_index', [], Response::HTTP_SEE_OTHER);
    }
}
