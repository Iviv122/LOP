<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use App\Repository\LinkRepository;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: LinkRepository::class)]
#[ApiResource]
class Link
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\ManyToOne(inversedBy: 'links')]
    #[ORM\JoinColumn(nullable: false)]
    private ?LinkCollection $collection_id = null;

    #[orm\column(length: 255)]
    private ?string $name = null;

    #[orm\column(length: 3000)]
    private ?string $url = null;


    public function getId(): ?int
    {
        return $this->id;
    }

    public function getCollectionId(): ?LinkCollection
    {
        return $this->collection_id;
    }

    public function setCollectionId(?LinkCollection $collection_id): static
    {
        $this->collection_id = $collection_id;

        return $this;
    }

    public function getName(): ?string
    {
        return $this->name;
    }

    public function setName(string $name): static
    {
        $this->name = $name;

        return $this;
    }
    public function getUrl(): ?string
    {
        return $this->url;
    }

    public function setUrl(string $url): static
    {
        $this->url = $url;

        return $this;
    }
}
