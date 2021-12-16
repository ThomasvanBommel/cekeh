let editor;
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

async function move(x, y){
    while(x !== player.position.x && y !== player.position.y){
        if(x < player.position.x) player.position.x--;
        if(x > player.position.x) player.position.x++;
        if(y < player.position.y) player.position.y--;
        if(y > player.position.y) player.position.y++;

        console.log(player.position);
    }
}

window.onload = () => {
    editor = CodeMirror(
        document.querySelector("main"), {
            value: `move(200, 200);`,
            mode: "javascript",
            theme: "material-ocean",
            lineNumbers: true
        }
    );

    editor.setOption("extraKeys", {
        "Ctrl-/": cm => cm.toggleComment(),
        "Ctrl-Enter": () => run()
    });

    for(let el of document.querySelectorAll(".year")){
        el.innerText = new Date().getFullYear();
    }
};

function run(){
    eval(editor.getValue());
}