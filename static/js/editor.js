const editor = {
    open_files: {},

    // Initialize this object
    init: function() {
        this.tabs     = document.querySelector("#tabs");
        this.tabs.add = document.querySelector("#tabs .add");
        this.save_btn = document.querySelector("#save");
        this.run_btn  = document.querySelector("#run");

        this.tabs.add.onclick = () => this.newFile();
        this.save_btn.onclick = () => this.save();
        this.run_btn.onclick  = () => this.run();
        
        this.code_mirror = CodeMirror(
            document.querySelector("main"), {
                mode:  "text",
                theme: "material-ocean",
                lineNumbers: true,
                autofocus: true,
                extraKeys: {
                    "Ctrl-/"    : cm => cm.toggleComment(),
                    "Ctrl-S"    : () => this.save(),
                    "Ctrl-Enter": () => this.run(),
                }
            }
        );

        console.log("Loaded editor.js");
    },

    // Insert script and add to tab bar
    addFile: function(file_name, value="") {
        if(file_name && file_name in Object.keys(this.open_files))
            return Error("Script with that file_name already exists...");

        let li = document.createElement("li");

        li.setAttribute("data-file-name", file_name);
        li.innerText = file_name;
        li.onclick = e => {
            if(!li.classList.contains("active"))
                this.setActiveFile(file_name);
        };

        this.open_files[file_name] = value;
        this.tabs.insertBefore(li, tabs.add);
        this.setActiveFile(file_name);
    },

    // Create a new script
    newFile: function() {
        let li    = document.createElement("li");
        let input = document.createElement("input");

        input.onkeyup = e => {
            if(e.key === "Enter" && !!input.value){
                li.outerHTML = "";
                this.addFile(input.value);
            }
        };

        li.append(input);
        this.tabs.insertBefore(li, tabs.add);

        input.focus();
    },

    // Set the active tab and update the editor
    setActiveFile: function(file_name) {
        let extension = file_name.split(".").pop();
        let active    = tabs.querySelector(":scope .active");
        let file      = tabs.querySelector(`:scope li[data-file-name="${ file_name }"]`);

        let mode = "text";

        if(extension.toLowerCase() === "js")
            mode = "javascript";
        
        this.code_mirror.setOption("mode", mode);

        if(active){
            this.open_files[active.innerText] = this.code_mirror.getValue();
            active.classList.remove("active");
        }
        
        this.code_mirror.setValue(this.open_files[file_name]);
        file.classList.add("active");
    },

    // Save active script
    save: function() {},

    // Run active script
    run: function() {
        eval(this.code_mirror.getValue());
    }
};

// for(let key in editor)
//     if(typeof editor[key] == "function")
//         editor[key] = editor[key].bind(editor)
