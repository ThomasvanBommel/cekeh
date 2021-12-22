FROM golang

ENV PROJECT_DIR=/go/src/cekeh
ENV GIN_MODE="release"

WORKDIR $PROJECT_DIR

COPY . .

RUN ./build

USER 9999

CMD ./run