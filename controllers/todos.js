const todosRouter = require('express').Router();
const user = require('../models/user');
const Todo = require('../models/todo');

// Ruta para manejar las solicitudes POST a /api/todos
todosRouter.post("/", async (request, response) => {
    try {
        const user = request.user;
        if (!user) {
            return response.status(401).json({ error: 'User not authenticated' });
        }

        const { nombre, numero, cedula,  costo,monto } = request.body;
        console.log('Datos recibidos:', nombre, numero, cedula, costo, monto); // Verifica los datos recibidos

        const newTodo = new Todo({
            nombre: nombre,
            numero: numero,
            cedula: cedula,
            costo: costo,
            monto: monto,
            checked: false,
            user: user._id
        });

        const savedTodo = await newTodo.save();
        user.todos = user.todos.concat(savedTodo._id);
        await user.save();
        console.log('Tarea guardada:', savedTodo); // Verifica la tarea guardada

        return response.status(200).json(savedTodo);
    } catch (error) {
        return response.status(500).json({ error: 'An error occurred' });
    }
});

// Ruta para manejar las solicitudes GET a /api/todos
todosRouter.get("/", async (request, response) => {
    try {
        const todos = await Todo.find({});
        response.json(todos);
    } catch (error) {
        response.status(500).json({ error: 'An error occurred' });
    }
});


// Ruta para manejar las solicitudes DELETE a /api/todos/:id
todosRouter.delete("/:id", async (request, response) => {  // Ruta corregida
    try {
        const user = request.user;
        if (!user) {
            return response.status(401).json({ error: 'Usuario no autenticado' });
        }

        const todoId = request.params.id;
        console.log('ID de la tarea a eliminar:', todoId); // Log del ID

        const todo = await Todo.findById(todoId);
        if (!todo) {
            console.log('Tarea no encontrada'); // Log cuando la tarea no se encuentra
            return response.status(404).json({ error: 'Tarea no encontrada' });
        }

        if (todo.user.toString() !== user._id.toString()) {
            return response.status(401).json({ error: 'No autorizado para eliminar esta tarea' });
        }

        await Todo.findByIdAndDelete(todoId);
        user.todos = user.todos.filter(id => id.toString() !== todoId);
        await user.save();
        console.log('Tarea eliminada'); // Log de confirmación de eliminación
        return response.status(204).end();
    } catch (error) {
        console.error('Error al eliminar la tarea:', error); // Log del error
        return response.status(500).json({ error: 'Ocurrió un error' });
    }
});
module.exports = todosRouter;
