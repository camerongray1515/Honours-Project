serviceForm = {
    selectHost: function() {
        $("#host-selection-modal").modal();
    },
    addDependencyClicked: function() {
        serviceForm.nextAction = serviceForm.addDependency;
        serviceForm.selectHost();
    },
    addDependency: function(item) {
        item["icon"] = (item["type"] == "group") ? "object-group" : "desktop";

        // Check the item doesn't already exist before adding
        var exists = false;
        $(".dependency-item").each(function(index) {
            var id = $(this).attr("data-item-id");
            var type = $(this).attr("data-item-type");
            if (item["id"] == id && item["type"] == type) {
                exists = true;
            }
        });

        if (exists) {
            ui.showAlert("error", "That item already exists as a dependency");
        } else {
            var html = ui.renderTemplate("template-dependency", item);
            $("#dependency-container").append(html);
            $("#dependency-container").trigger("dependency-update");
        }
    },
    addItemClicked: function() {
        serviceForm.nextAction = serviceForm.addItem;
        serviceForm.actionGroup = $(this).closest(".service-dependency");
        serviceForm.selectHost();
    },
    addItem: function(item) {
        item["icon"] = (item["type"] == "group") ? "object-group" : "desktop";

        var exists = false;
        $(serviceForm.actionGroup).find(".redundancy-group-item").each(function(index) {
            var id = $(this).attr("data-item-id");
            var type = $(this).attr("data-item-type");
            if (item["id"] == id && item["type"] == type) {
                exists = true;
            }
        });

        if (exists) {
            ui.showAlert("error", "That item already exists as a dependency");
        } else {
            var html = ui.renderTemplate("template-redundancy-group-item", item);
            $(serviceForm.actionGroup).find(".dependency-item-container").append(html);
        }
        $("#dependency-container").trigger("dependency-update");
    },
    addRedundancyGroup: function() {
        var html = ui.renderTemplate("template-redundancy-group", {});
        $("#dependency-container").append(html);
        $("#dependency-container").trigger("dependency-update");
    },
    itemSelection: function() {
        $("#host-selection-modal").modal("hide");

        var item = {
            "id": $(this).attr("data-item-id"),
            "name": $(this).attr("data-item-name"),
            "type": $(this).attr("data-item-type")
        }

        serviceForm.nextAction(item);
    },
    removeDependency: function() {
        $(this).closest(".service-dependency").remove();
        $("#dependency-container").trigger("dependency-update");
    },
    removeRedundancyGroupItem: function() {
        $(this).closest(".redundancy-group-item").remove();
        $("#dependency-container").trigger("dependency-update");
    },
    serialise: function() {
        var dependencies = [];
        var redundancyGroups = [];

        $(".service-dependency").each(function() {
            var dependencyType = $(this).data("dependency-type");
            if (dependencyType == "dependency") {
                dependencies.push({
                    "id": $(this).find(".dependency-item").data("item-id"),
                    "type": $(this).find(".dependency-item").data("item-type")
                });
            } else if (dependencyType == "redundancy-group") {
                var redundancyGroup = {"items": []};
                $(this).find(".redundancy-group-item").each(function() {
                    redundancyGroup["items"].push({
                        "id": $(this).data("item-id"),
                        "type": $(this).data("item-type")
                    });
                });
                redundancyGroups.push(redundancyGroup);
            }
        });

        return {"dependencies": dependencies, "redundancyGroups": redundancyGroups};
    },
    updateDependencyFormInput() {
        $("#input-dependencies").val(JSON.stringify(serviceForm.serialise()));
    },
    bindEventHandlers: function() {
        $("#add-dependency").click(serviceForm.addDependencyClicked);
        $("#add-redundancy-group").click(serviceForm.addRedundancyGroup);
        $("button.select-item").click(serviceForm.itemSelection);
        $("#dependency-container").on("click", ".add-item", serviceForm.addItemClicked);
        $("#dependency-container").on("click", ".btn-dependency-remove-item", serviceForm.removeRedundancyGroupItem);
        $("#dependency-container").on("click", ".dependency-remove", serviceForm.removeDependency);
        $("#dependency-container").on("dependency-update", serviceForm.updateDependencyFormInput);
    }
}

$(document).ready(function() {
    serviceForm.bindEventHandlers();
    serviceForm.updateDependencyFormInput();
});
