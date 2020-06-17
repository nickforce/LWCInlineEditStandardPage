import { LightningElement, api, track, wire } from 'lwc';
import { getRecordUi } from 'lightning/uiRecordApi';
import prepareDependenciesRecordUI from '@salesforce/apex/RecordUIWrapper.prepareDependenciesRecordUI';

/*** Pseudo code outline *****/
/*****************************/
// call wire adapter getRecordUI for current record Id
// returns Page layout information and Object/Field datatype information
// build a JS object structure with the returned wire adapter JSON
// Iterate the JS object structure on the HTML of this component to replicate..
// .. a standard page layout with inline edit capabilities
// .. there should a component for each data type with rendering based on the current field being displayed

// with the wire adapter getRecordUI Json..
// .. iterate layouts in getRecordUI.. insert new object in layoutcomponents section of JSON for the field datatype
// .. then iterate that structure on html
// .. server side APEX calls will be used for building dependencies for ProductSymptoms 
// .. and then structured accordingly and returned to this component

// notes - display the full getRecordUI for a record to get a sense of the JSON structure if needed


export default class ExampleGetRecordUIWire extends LightningElement {
    recordUIData;
    @api recordId;

    // TODO: replace hardcoded Id with a new variable - $recordId - to dynamically pull from
    @wire(getRecordUi, { recordIds: '0031I0000188mpDQAQ', layoutTypes: 'Full', modes: 'View' })
    recordUIInfo({ error, data }) {
        if(data) {
            this.recordUIData = data;

            if(this.recordUIData) {
                console.log('wire done');
                console.log(this.recordUIData);
                // TODO: write a method to iterate the wire adapter JSON into JS object structures - see bottom of this file for outline
                var recordUIObjects = Object.keys(this.recordUIData).map(key=> ({ key: key, ...this.recordUIData[key] }));
                console.log(recordUIObjects);
                var i;
                for (i = 0; i < recordUIObjects.length; i++) {
                    console.log(recordUIObjects[i].key);
                }
            }
        }
        else if(error) {
            console.log('recordUIInfo error');
        }
    }
    /************************** */
    // "then" promise structure for calling apex method imperitively

    // if(data) {
    //     prepareDependenciesRecordUI({objectInfoVar: this.objectInfo, recordUIJSON: data})
    //         .then(result => {
    //             this.apexResult = result;
    //         })
    //         .catch(error => {
    //             this.error = error;
    //         });
    // }
    // else if(error) {
    //     console.log(error);
    // }




    /************************** */
    // APEX Mockup .. this will need to be rewritten into JS object structures


    // 3 total components
    // Page List<Sections>
    // Section List<Field>
    // Field 
    // -attributes- value, required, data type, event to surface data input to parent component.

   
    /*
    // Page
    public class WrapperPage {
        public String localVar;
        public Boolean createable;
        public String defaultRecordTypeId;
        public Boolean deletable;
        public List<WrapperSection> sections;

        public WrapperPage(String nLocalVar) {
            this.localVar = nLocalVar;
        }
    }
    // Section
    public class WrapperSection {
        public Boolean collapsed;
        public Integer collumns;
        public String heading;
        public List<WrapperField> fields;

        public WrapperSection() {

        }
    }
    // Field
    public class WrapperField {
        public String value;
        public Boolean required;
        public String dataType;
        public String surfaceDataEvent;
        public String apiName;

        public WrapperField() {

        }
    }
    */
}