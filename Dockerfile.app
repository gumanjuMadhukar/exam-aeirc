FROM 		node:alpine as staticbuild
WORKDIR 	/app
COPY 		--chown=node:node . .
RUN		npm run build
USER		node
EXPOSE		3001
CMD		npm run start

#FROM	nginx:stable-alpine
#RUN 	addgroup -S www && adduser -S www -G www
#WORKDIR /var/www/html
#COPY    --from=staticbuild /app/build ./build 
#COPY	app.conf /etc/nginx/conf.d/app.conf
#USER	www
