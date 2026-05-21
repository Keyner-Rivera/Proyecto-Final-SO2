# Imagen base de Nginx para servir archivos estáticos
FROM nginx:alpine

# Copiar el archivo HTML al directorio de Nginx
COPY index.html /usr/share/nginx/html/index.html

# Exponer el puerto 80
EXPOSE 80

# HEALTHCHECK: Verificar que Nginx está respondiendo correctamente
HEALTHCHECK --interval=30s --timeout=3s \
  CMD wget --quiet --tries=1 --spider http://localhost/ || exit 1