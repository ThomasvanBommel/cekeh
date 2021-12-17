let editor;
let save_btn, saving = false;
let tabs;

const game = {
    level: 0,
    map: 1,
};

const player = {
    id: "u38nr08wnu0w9fnw09e",
    name: "bob",
    speed: 1,
    position: {
        x: 100,
        y: 100
    }
};

let scripts = {
    "main.js": "console.log('Hello!');",
    "second.js": "// Yo!"
};

let main = {
    init: () => {
        // editor = CodeMirror(
        //     document.querySelector("main"), {
        //         mode: "javascript",
        //         theme: "material-ocean",
        //         lineNumbers: true
        //     }
        // );
    
        // editor.setOption("extraKeys", {
        //     "Ctrl-/": cm => cm.toggleComment(),
        //     "Ctrl-Enter": run,
        //     "Ctrl-S": save
        // });
    
        // save_btn = document.querySelector("#save");
        // tabs = document.querySelector("#tabs");
        // tabs.add = tabs.querySelector(":scope .add");
        tabs.add.onclick = () => {
            let li = document.createElement("li");
            let input = document.createElement("input");
    
            input.type = "text";
            input.onkeyup = e => {
                if(e.key === "Enter"){
                    li.innerHTML = input.value;
                }
            };
    
            li.append(input);
            tabs.insertBefore(li, tabs.add);
            input.focus();
        };
    
        let i = 0;
        for(let key of Object.keys(scripts)){
            let li = document.createElement("li");
    
            li.innerText = key;
            li.onclick = e => {
                if(li.classList.contains("active"))
                    return;
    
                let active = tabs.querySelector(":scope li.active");
                active.classList.remove("active");
                li.classList.add("active");
    
                scripts[active.innerText] = editor.getValue();
                editor.setValue(scripts[key]);
            };
    
            if(i++ === 0){
                li.classList.add("active");
                editor.setValue(scripts[key]);
            }
    
            // tabs.append(li);
            tabs.insertBefore(li, tabs.add);
        }
        
    
        for(let el of document.querySelectorAll(".year")){
            el.innerText = new Date().getFullYear();
        }

        console.log("Loaded main.js");
    }
};

function run(){
    eval(editor.getValue());
}

async function save(){
    if(saving) return;

    let innerHTML = save_btn.innerText;
    let color = save_btn.style.color;

    saving = true;
    save_btn.disabled = true;
    save_btn.innerHTML += "<div class='spinner'></div>";
    save_btn.style.color = "transparent";

    await new Promise(r => setTimeout(r, 2000));

    save_btn.disabled = false;
    save_btn.innerHTML = innerHTML;
    save_btn.style.color = color;
    saving = false;
}