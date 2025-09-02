#!/usr/bin/env bash
# run_datax_nginx.sh
# Starts the nginx container for datax-cash-site in detached mode with restart=always.
# Usage: ./run_datax_nginx.sh start|stop|status

SITE_DIR="/home/fila/jqdDev_2025/dbos_desk/datax.cash.web/datax-cash-site"
NGINX_CONF="/home/fila/jqdDev_2025/dbos_desk/datax.cash.web/datax_nginx.conf"
CONTAINER_NAME="datax-nginx"
IMAGE="nginx:stable"

case "$1" in
  start)
    # If container exists, start it; otherwise create a new one
    if docker ps -a --format '{{.Names}}' | grep -q "^${CONTAINER_NAME}$"; then
      echo "Container ${CONTAINER_NAME} already exists. Starting..."
      docker start "${CONTAINER_NAME}"
    else
      echo "Running new container ${CONTAINER_NAME} (detached, --restart=always)..."
      docker run -d --restart=always --name "${CONTAINER_NAME}" -p 8080:80 \
        -v "${SITE_DIR}:/usr/share/nginx/html:ro" \
        -v "${NGINX_CONF}:/etc/nginx/conf.d/default.conf:ro" \
        "${IMAGE}"
    fi
    ;;
  stop)
    echo "Stopping container ${CONTAINER_NAME}..."
    docker stop "${CONTAINER_NAME}" || true
    ;;
  status)
    docker ps --filter "name=${CONTAINER_NAME}"
    ;;
  restart)
    $0 stop
    $0 start
    ;;
  remove)
    echo "Removing container ${CONTAINER_NAME}..."
    docker rm -f "${CONTAINER_NAME}" || true
    ;;
  *)
    echo "Usage: $0 {start|stop|status|restart|remove}"
    exit 2
    ;;
esac
