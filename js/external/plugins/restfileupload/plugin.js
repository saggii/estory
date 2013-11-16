/**
 * Created with JetBrains WebStorm.
 * User: saychinu
 * Date: 11/11/13
 * Time: 6:30 AM
 * To change this template use File | Settings | File Templates.
 */
 CKEDITOR.plugins.add('restfileupload', {
    icons:'insertImage',
    init:function (editor) {
        editor.addCommand('insertImageDialog',new CKEDITOR.dialogCommand( 'insertImageDialog' ) );
        editor.ui.addButton('insertImage', {
            label:'Insert Rest Image',
            command:'insertImageDialog',
            toolbar:'insert'
        });

        CKEDITOR.dialog.add( 'insertImageDialog',function (editor){
            return {
                title: 'Insert Image',
                minWidth: 400,
                minHeight: 200,
                contents: [
                {
                    id: 'tab-basic',
                    label: 'Basic Settings',
                    elements: [
                    {
                        type: 'file',
                        id: 'upload',
                        label: 'Select file from your computer'
                   },
				{
    				type: 'fileButton',
    				label: 'Upload',
    				id: 'uploadButton',
    				'for': [ 'tab-basic', 'upload' ]
				}
         ]
}
],
onOk: function(){
    var dialog = this;
    var imageLocation = editor.document.createElement( 'img' );
    console.log(dialog.getValueOf( 'tab-basic', 'upload' ));
    imageLocation.setAttribute( 'src', dialog.getValueOf( 'tab-basic', 'upload' ) );
    imageLocation.setText( dialog.getValueOf( 'tab-basic', 'upload' ));
    editor.insertElement(imageLocation);
}
};
});

}
});

