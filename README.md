# cekeh

[cekeh.com](http://cekeh.com) website

<br />

## Running this project

Locally
```bash
./run

# or

./build && ./run
```

Docker
```bash
# build image
sudo docker build --tag gocekeh .

# run image
sudo docker run --rm -ti -p 9000:8080  gocekeh

# both
sudo docker build --tag gocekeh . && sudo docker run --rm -ti -p 9000:8080  gocekeh
```

Podman
```bash
# build image
sudo podman build --tag gocekeh .

# run image
sudo podman run --rm -ti -p 9000:8080  gocekeh

# both
sudo podman build --tag gocekeh . && sudo podman run --rm -ti -p 9000:8080  gocekeh
```

~~Kubernetes~~
```bash
# coming soon
```