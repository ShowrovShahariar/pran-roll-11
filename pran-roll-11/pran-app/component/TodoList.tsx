import { View, Text, TextInput, Pressable, FlatList } from 'react-native'
import React, { useState } from 'react'

type Task = {
    id: string
    task: string
    completed: boolean
}

const TodoList = () => {

    const [task, setTask] = useState('')
    const [tasks, setTasks] = useState<Task[]>([])

    const addTask = () => {
        if (task.trim() === '') return
        const updatedTasks = [...tasks, {
            id: Date.now().toString(),
            task: task,
            completed: false
        }]
        setTasks(updatedTasks)
        setTask('')
    }

    const toggleTask = (id: string) => {
        const updatedTasks = tasks.map((item) =>
            item.id === id ? { ...item, completed: !item.completed } : item
        )
        setTasks(updatedTasks)
    }

    const deleteTask = (id: string) => {
        const updatedTasks = tasks.filter((item) => item.id !== id)
        setTasks(updatedTasks)
    }

    const renderTask = ({ item }: { item: Task }) => (
        <View className='flex-row gap-3 bg-white p-4 mb-3 items-center shadow-sm border border-gray-100 rounded-sm'>
            <Pressable
                onPress={() => toggleTask(item.id)}
                className={`w-7 h-7 rounded-full justify-center items-center ${item.completed ? "bg-emerald-500" : "border border-gray-300"}`}
            >
                {item.completed && <Text className='text-white'>✓</Text>}
            </Pressable>

            <Text className={`text-base ${item.completed ? "line-through text-gray-400" : "text-gray-700"}`}>
                {item.task}
            </Text>

            <Pressable onPress={() => deleteTask(item.id)}>
                <Text className='text-red-500 font-medium'>
                    Delete
                </Text>
            </Pressable>
        </View>
    )

    return (
        <View className='flex-1 px-5 pt-10'>
            <View className='mb-10'>
                <Text className='text-3xl font-bold text-emerald-600'>My TodoList</Text>
                <Text className="text-base text-gray-400">Keep your task listed.</Text>
            </View>

            <View>
                <Text>{tasks.filter((item) => !item.completed).length} Remaining</Text>
            </View>

            <View className='flex-row gap-3 mb-8'>
                <TextInput
                    className='flex-1 bg-white px-4 py-3 rounded-lg border border-gray-100'
                    placeholder='Enter your task..'
                    value={task}
                    onChangeText={setTask}
                />
                <Pressable
                    onPress={addTask}
                    className='bg-emerald-500 px-8 justify-center items-center rounded-lg'
                >
                    <Text className='text-white font-medium'>Add</Text>
                </Pressable>
            </View>

            <FlatList
                data={tasks}
                keyExtractor={(item) => item.id}
                renderItem={renderTask}
            />
        </View>
    )
}

export default TodoList
