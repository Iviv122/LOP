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

export OpenApi scheme
```
php bin/console nelmio:apidoc:dump --format=yaml --server-url=http://localhost:8000/api > schema.yaml
```

import OpenApi scheme
```
npm run openapi
```
