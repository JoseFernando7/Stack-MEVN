<template>
    <div>
        <nav class="navbar navbar-light bg-light">
            <a href="/" class="navbar-brand"> MEVN Stack </a>
        </nav>

        <div class="container">
            <div class="row pt-5">
                <div class="col-md-5">
                    <div class="card">
                        <div class="card-body">
                            <form @submit.prevent="addTask">
                                <div class="form-group">
                                    <input type="text" placeholder="Inserte una tarea" class="form-control" v-model="task.title">
                                </div>

                                <div class="form-group">
                                    <textarea cols="30" rows="10" class="form-control" placeholder="Inserte una descripción" v-model="task.description"></textarea>
                                </div>

                                <template v-if="edit === false">
                                    <button class="btn btn-primary btn-block"> Guardar </button>
                                </template>

                                <template v-else>
                                    <button class="btn btn-primary btn-block"> Actualizar </button>
                                </template>
                            </form>
                        </div>
                    </div>
                </div>

                <div class="col-md-7">
                    <table class="table table-bordered">
                        <thead>
                            <tr>
                                <th> Tarea </th>
                                <th> Descripción </th>
                            </tr>
                        </thead>

                        <tbody>
                            <tr v-for="task of tasks" :key="task">
                                <td> {{ task.title }}</td>
                                <td> {{ task.description }}</td>
                                <td>
                                    <button @click="deleteTask(task._id)" class="btn btn-danger"> Eliminar </button>
                                    <button @click="updateTask(task._id)" class="btn btn-secondary"> Editar </button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</template>


<script>
    class Task
    {
        constructor(title, description)
        {
            this.title = title;
            this.description = description;
        }
    }

    export default 
    {
        name: 'App.vue',

        data()
        {
            return {
                task: new Task(),
                tasks: [],
                edit: false,
                taskToEdit: ''
            }
        },

        created()
        {
            this.getTask()
        },

        methods:
        {
            addTask()
            {
                if(this.edit === false)
                {
                    fetch('/api/tareas', 
                    {
                        method: 'POST',
                        body: JSON.stringify(this.task),
                        headers: 
                        {
                            'Accept': 'application/json',
                            'Content-type': 'application/json'
                        }
                    }).then(res => res.json()).then(data => this.getTask());
                }
                else
                {
                    fetch('/api/tareas/' + this.taskToEdit,
                    {
                        method: 'PUT',
                        body: JSON.stringify(this.task),
                        headers:
                        {
                            'Accept': 'application/json',
                            'Content-type': 'application/json'
                        }
                    }).then(res => res.json()).then(data =>
                    {
                        this.getTask();
                        this.edit = false;
                    });
                }

                this.task = new Task();
            },

            getTask()
            {
                fetch('/api/tareas').then(res => res.json())
                .then(data => 
                {
                    this.tasks = data;
                });
            },

            deleteTask(id)
            {
                fetch('/api/tareas/' + id, 
                {
                    method: 'DELETE',
                    headers: 
                    {
                        'Accept': 'application/json',
                        'Content-type': 'application/json'
                    }
                }).then(res => res.json()).then(data => {this.getTask()});
            },

            updateTask(id)
            {
                fetch('/api/tareas/' + id)
                .then(res => res.json()).then(data => 
                {
                    this.task = new Task(data.title, data.description);
                    this.taskToEdit = data._id;
                    this.edit = true;
                })
            }
        }
    }
</script>


<style scoped>

</style>