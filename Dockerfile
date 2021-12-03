FROM golang

ENV PORT=8080 \
    PROJECT_DIR=/opt/project

WORKDIR ${PROJECT_DIR}
COPY . .

RUN go build src/main.go

CMD ./main