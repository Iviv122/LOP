create admin:
```
php bin/console app:create-admin
```

migrate:
```
php bin/console doctrine:migrations:migrate
```

generate keys:
```
php bin/console lexik:jwt:generate-keypair --skip-if-exists
```

generate OpenApi scheme
```
php bin/console api:openapi:export -y
```