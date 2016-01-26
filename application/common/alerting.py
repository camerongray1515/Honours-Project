from models import Alert
import importlib
import os

module_dir = os.path.normpath(os.path.join(os.path.dirname(
    os.path.realpath(__file__)),"alert_modules"))

# This must be called BEFORE inserting the new health status
def alerts_to_trigger(host_id, plugin_id, check_id, health_status):
    pass

def get_alert_modules():
    modules = []
    for filename in os.listdir(module_dir):
        if os.path.isdir(filename):
            continue
        module = importlib.import_module(
            "alert_modules.{}".format(filename.replace(".py", "")))
        module_data = {
            "name": module.module_name,
            "config": module.config
        }
        modules.append(module_data)

    return modules

if __name__ == "__main__":
    print(get_alert_modules())