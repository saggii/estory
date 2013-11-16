/**
 * Basic sample plugin inserting current date and time into CKEditor editing area.
 *
 * Created out of the CKEditor Plugin SDK:
 * http://docs.ckeditor.com/#!/guide/plugin_sdk_intro
 */

// Register the plugin within the editor.
CKEDITOR.plugins.add( 'timestamp', {

    // Register the icons. They must match command names.
    icons: 'timestamp',

    // The plugin initialization logic goes inside this method.
    init: function( editor ) {

        // Define an editor command that inserts a timestamp.
        editor.addCommand( 'insertTimestamp', {

            // Define the function that will be fired when the command is executed.
            exec: function( editor ) {
                
                Date.prototype.yyyymmdd = function() {
   					var yyyy = this.getFullYear().toString();
   					var mm = (this.getMonth()+1).toString(); // getMonth() is zero-based
   					var dd  = this.getDate().toString();
   					return yyyy +'-'+ (mm[1]?mm:"0"+mm[0])+'-' + (dd[1]?dd:"0"+dd[0]); // padding
  				};
				var now = new Date();
                // Insert the timestamp into the document.
                editor.insertHtml( '<b>Express Story</b>&nbsp;&nbsp;&nbsp;');
                editor.insertHtml( '<em>' + now.yyyymmdd() + '</em><br/>' );
            }
        });

        // Create the toolbar button that executes the above command.
        editor.ui.addButton( 'Timestamp', {
            label: 'Insert Timestamp',
            command: 'insertTimestamp',
            toolbar: 'insert'
        });
    }
});