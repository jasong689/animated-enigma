const WebSocket = require("ws")
const ShareDb = require("sharedb");
const richText = require("rich-text");
const websocket = require("websocket-stream");
const WebSocketJSONStream = require('@teamwork/websocket-json-stream');

ShareDb.types.register(richText.type);
let backend = new ShareDb();

let connection = backend.connect();
let doc = connection.get('examples', 'richtext');

doc.fetch(function(err) {
    if (err) {
        throw err;
    }

    if (doc.type === null) {
      doc.create([{insert: 'Hi!'}], 'rich-text', startServer);
      return;
    }
    
    startServer();
});

function startServer() {
    let wss = new WebSocket.Server({
        port: 8082
    });

    wss.on("connection", (ws) => {
        let stream = new WebSocketJSONStream(ws);

        backend.listen(stream);
    });

    wss.on("listening", () => console.log("listening on", 8082));
}