FROM node:12.14.1-alpine

RUN apk add --update git openssh bash vim

RUN mkdir -p /mnt/code

WORKDIR /mnt/code

EXPOSE 3000

CMD ["/bin/sh"]
