package main

import (
	"fmt"
	"net/http"
	"os"
)

func root(html string) func(http.ResponseWriter, *http.Request) {
	return func(w http.ResponseWriter, req *http.Request) {
		fmt.Fprintf(w, html)
	}
}

func api(w http.ResponseWriter, req *http.Request) {
	fmt.Fprintf(w, "api\n")
}

func main() {
	PORT := "8080"
	rootHTML, err := os.ReadFile("root.html")

	if err == nil {
		fs := http.FileServer(http.Dir("./static"))
		http.Handle("/static/", http.StripPrefix("/static/", fs))

		http.HandleFunc("/", root(string(rootHTML)))
		http.HandleFunc("/api/", api)

		fmt.Println("Listening ... http://localhost:" + PORT)

		http.ListenAndServe(":" + PORT, nil)
	} else {
		fmt.Println("Error:", err)
	}
}
