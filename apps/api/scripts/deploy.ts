import { $ } from "zx";

const image = "ghcr.io/amirilovic/effective-monorepos-api:latest";

async function deploy() {
  await $`pnpm -F @shop/website deploy --prod out`;

  await $`echo "username: $DOCKER_USERNAME pass: $DOCKER_PASSWORD"`;

  await $`echo "$DOCKER_PASSWORD" | docker login ghcr.io --username "$DOCKER_USERNAME" --password-stdin`;

  await $`docker build -f ./out/Dockerfile \
        -t ${image} \
        --cache-from=${image} ./out`;

  await $`docker push ${image}`;
}

deploy();
