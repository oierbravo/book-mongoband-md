var visit = require('unist-util-visit');
function remarkPluginSongLinks(tree) {

    return transformer;
    
    function transformer(tree) {
      visit(tree, 'link', visitor);
  
      function visitor(node,file) {
        if(node.title === null){
          node.title = node.children[0].value;
        }
        node.url = 'audios/' +  node.url + '.mp3';
        node.type = 'html';
        node.value = renderAudioTag(node.url,{label:node.title})

      }
      
    }
}
const renderAudioTag = (url, options) => {

  const videoNode = `
  ${options.label}:
		<audio controls 
			src=${url}

		></audio>
	`;

	return videoNode;
};
module.exports = remarkPluginSongLinks;