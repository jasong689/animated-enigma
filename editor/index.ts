import Quill from "quill";
import ReconnectingWebSocket from "reconnecting-websocket";
import { Connection, types } from "sharedb/lib/client";
import richText from "rich-text";
import Delta from "quill-delta";

let socket = new ReconnectingWebSocket('ws://localhost:8082');
let connection = new Connection(socket);
types.register(richText.type);

var doc = connection.get('examples', 'richtext');
doc.subscribe(function(err) {
    if (err) {
        throw err;
    }
  
    let quill = new Quill("#editor", {
        modules: { toolbar: true },
        theme: 'snow'
    });
    
    quill.setContents(doc.data);
    quill.on('text-change', function(delta, oldDelta, source) {
        if (source !== 'user') {
            return;
        }
        console.log("delta", delta)
        doc.submitOp(delta, {source: quill});
    });

    doc.on('op', function(op, source) {
        if (source === quill) {
            return;
        }

        let delta = op as unknown as Delta;

        quill.updateContents(delta);
    });
});