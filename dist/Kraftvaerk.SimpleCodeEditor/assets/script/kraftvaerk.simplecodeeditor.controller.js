angular.module("umbraco").controller("Kraftvaerk.SimpleCodeEditorController",
    function ($scope, assetsService, notificationsService) {

        assetsService.loadJs("/app_plugins/kraftvaerk.simplecodeeditor/assets/script/vendor/behave.min.js")
            .then(function () {
			
			//TODO
			// Test configuration - Does it act right?
			// Screendumps
			// Screenr
			// Enable / Disable line-numbers

			 //Fetch the config value for displaying line number
			 $scope.displayLineNumbers = $scope.model.config.displaylinenumbers;

			if ($scope.displayLineNumbers =='1') {

			//Figuring out how many lines are saved
			var string = $scope.model.value,
				lines = string.split(/\r\|\r|\n/).length;

				if(lines > 0){
				    var house = document.getElementById($scope.model.alias + '_sce-lines'),
						html = '',
						i;
					for(i=0; i<lines; i++){
						html += '<div>'+(i+1)+'</div>';
					}
					house.innerHTML = html;		
				}

				/*
			 	* This hook adds autosizing functionality
			 	* to your textarea
			 	*/

				BehaveHooks.add(['keydown'], function(data){
					var	numLines = data.lines.total,
						fontSize = parseInt( getComputedStyle(data.editor.element)['font-size'] ),
						padding = parseInt( getComputedStyle(data.editor.element)['padding'] );
						
						//Only grow textarea if it's height is greater than it's default height
						if((numLines*fontSize)+padding > 200){
							data.editor.element.style.height = (((numLines*fontSize)+padding))+'px';
						}
				});
			
				/*
			 	* This hook adds Line Number Functionality
			 	*/
				BehaveHooks.add(['keydown'], function (data) {
				    if (data.editor.element.id.indexOf($scope.model.alias + "_") != 0) {
				        return;
				    }
					var	numLines = data.lines.total,
						html = '',
						i;
					for(i=0; i<numLines; i++){
						html += '<div>'+(i+1)+'</div>';
					}					
					document.getElementById($scope.model.alias + '_sce-lines').innerHTML = html;
				});

			};

			var editor = new Behave({
				textarea: 		document.getElementById($scope.model.alias + '_sce-field'),
				replaceTab: 	$scope.model.config.replacetab,
			    softTabs: 		$scope.model.config.softtabs,
			    tabSize: 		$scope.model.config.tabsize,
			    autoOpen: 		$scope.model.config.autoopen,
			    overwrite: 		$scope.model.config.overwrite,
			    autoStrip: 		$scope.model.config.autostrip,
			    autoIndent: 	$scope.model.config.autoindent
			});

			assetsService.loadCss("/app_plugins/kraftvaerk.simplecodeeditor/assets/css/kraftvaerk.simplecodeeditor.css");

	});
});
