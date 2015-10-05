from flask import Flask, render_template
from api import api

web = Flask(__name__)
web.register_blueprint(api)

@web.route("/example/")
def example():
    return render_template("example.html")

@web.route("/")
def home():
    return render_template("home.html", nav_section="home", section="Home")

@web.route("/hosts/")
def hosts():
    return render_template("hosts.html", nav_section="hosts", section="Hosts",
        title="Manage Hosts")

@web.route("/hosts/add/")
def hosts_add():
    return render_template("hosts-add.html", nav_section="hosts",
        section="Hosts", title="Add Host")

@web.route("/host-groups/")
def host_groups():
    return render_template("host-groups.html", nav_section="host-groups",
        section="Host Groups", title="Manage Host Groups")

if __name__ == "__main__":
    web.run(debug=True)
