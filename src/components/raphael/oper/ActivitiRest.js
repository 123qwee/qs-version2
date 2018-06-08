const ActivitiRest = {
  getProcessDefinition: function (processDefinitionId, callback) {
    var url = Lang.sub(this.options.processDefinitionUrl, {
      processDefinitionId: processDefinitionId
    });

    $.ajax({
      url: url,
      dataType: 'json',
      cache: false,
      async: true,
      success: function (data, textStatus) {
        var processDefinitionDiagramLayout = data;
        if (!processDefinitionDiagramLayout) {
          console.error("Process definition diagram layout '" + processDefinitionId + "' not found");
          return;
        } else {
          callback.apply({
            processDefinitionDiagramLayout: processDefinitionDiagramLayout
          });
        }
      }
    }).done(function (data, textStatus) {
      console.log("ajax done");
    }).fail(function (jqXHR, textStatus, error) {
      console.log('Get diagram layout[' + processDefinitionId + '] failure: ', textStatus, jqXHR);
    });
  }
}

export default ActivitiRest;