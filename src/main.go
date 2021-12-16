package main

import (
	"net/http"
	"log"
	"os"
)

/**
 * Respond to endpoint requests
 * @param html []byte - Information to send to the requesting client
 * @returns func(http.ResponseWriter, *http.Request)
 */
func respond(html []byte) func(http.ResponseWriter, *http.Request) {
	return func(w http.ResponseWriter, req *http.Request) {
		log.Println(req.RemoteAddr, req.URL)

		_, err := w.Write(html)

		if err != nil {
			log.Println("Error:", err)
		}
	}
}

/**
 * Start a web server and respond to endpoint requests
 */
func main() {
	port := "8080"
	home, err := os.ReadFile("home.html")

	if err != nil {
		log.Fatalln(err)
	}

	fs := http.FileServer(http.Dir("./static"))
	http.Handle("/static/", http.StripPrefix("/static/", fs))

	http.HandleFunc("/", respond(home))
	http.HandleFunc("/api/", respond([]byte("api\n")))

	log.Println("Listening...")

	http.ListenAndServe(":" + port, nil)
}
