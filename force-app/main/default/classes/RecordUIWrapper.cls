public with sharing class RecordUIWrapper {
    
    // Need to map the ProductSymptoms dependencies into the format needed by the LWC
    @AuraEnabled
    public static String prepareDependenciesRecordUI(Object recordUIJSON) {
        if(recordUIJSON == null) {
            return 'null params';
        }

        
        System.debug(recordUIJSON);
        return 'true';
    }
}