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
        editor.addCommand('imageR',new CKEDITOR.dialogCommand( 'imageR' ) );
        editor.ui.addButton('insertImage', {
            label:'Insert Rest Image',
            command:'imageR',
            toolbar:'insert'
        });

        var ref = CKEDITOR.tools.addFunction( function(fileURL,message) {
            console.log( fileURL);
            var element = new CKEDITOR.dom.element.createFromHtml('<img src="'+fileURL+'"/>');
            editor.insertElement(element);
        } );
        CKEDITOR.dialog.add( 'imageR',function (editor){
            return {
                title: 'Insert Image',
                minWidth: 400,
                minHeight: 200,
                contents: [
                {
                    id: 'info',
                    label: 'Basic Settings',
                    elements: [
                        {
                            type: 'file',
                            id: 'upload',
                            action:'http://localhost/ExpressStory/upload.php?CKEditor=contentEditor&CKEditorFuncNum='+ref,
                            label: 'Select file from your computer',
                            size: 38
                        },
                        {
                            type: 'fileButton',
                            id: 'fileId',
                            label: 'Upload file',
                            'for': [ 'info', 'upload' ],
                            filebrowser: {
                                onSelect: function( fileUrl, data ) {
                                    console.log('fileUrl'+fileUrl);


                                }
                            }
                        }
         ]
}
]
};
});

}
});

