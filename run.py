#!vvenv/bin/python
from flask_failsafe import failsafe


@failsafe
def create_app():
	from app import app, socketio
	return app, socketio

if __name__ == '__main__':
	#app, socketio = create_app()
	from app import app, socketio
	from app.views import all_views
	for view in all_views:
		print('Registering blueprint: ' + view.name)
		app.register_blueprint(view)
	socketio.run(app, port=4000, host='0.0.0.0')