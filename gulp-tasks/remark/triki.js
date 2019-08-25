var visit = require('unist-util-visit');
const toString = require("mdast-util-to-string");

function remarkPluginTriki(tree) {

    return transformer;
    
    function transformer(tree) {
      visit(tree, 'paragraph', visitor);
  
      function visitor(node) {
        if(toString(node).search('triki: ') != -1){
            let value = toString(node).replace('triki: ','');
            let children = [];
            value.split(',').map(function(group){
                groupChildren = [];
                group.split('-').map(function(el){
                    let norabidea = 'itxi';
                    if(el.substring(0,1) === '+'){
                        norabidea ='ireki'
                    }
                    let child = {
                        type: 'trikiNote',
                        data: {
                            hProperties : {
                                className:'triki-note triki-note--' + norabidea
                            },
                            hName:'div'
                        },
                        children: [{type:'text',value:el.replace('+','')}]
                    }
                    
                    if(el === '|'){
                        console.log(el);
                        child.data = {
                            hProperties : {
                                className:'triki-space'
                            },
                            hName:'div'
                        }
                        child.children = []
                    }
                    groupChildren.push(child)  
                });
                
                children.push({
                    type: 'trikiNoteGroup',
                        data: {
                            hProperties : {
                                className:'triki-group'
                            },
                            hName:'div'
                        },
                        children: groupChildren
                })
            });
            node.type = 'triki';
            node.children =children,
            node.data =  {
                hName: 'div',
                hProperties : {
                    className:'triki'
                },
              }
        }
      }
    }
}
module.exports = remarkPluginTriki;