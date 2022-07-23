document.addEventListener('click', (event) => {
    if (event.target.dataset.type === 'remove') {
        const id = event.target.dataset.id

        remove(id).then(() => {
            event.target.closest('li').remove()
        })


    }

    if (event.target.dataset.type === 'edit') {
        const id = event.target.dataset.id

        console.log(event.target)

        const currentTitle = event.target.dataset.title
        const newTitle = prompt('Введите новое название')

        const title = !newTitle ? currentTitle : newTitle

        edit(id, title)
    }
})

async function edit(id, newTitle) {
    const req = {id: id, title: newTitle}

    await fetch(`/edit`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify(req)
    })
}

async function remove(id) {
    await fetch(`/${id}`, {
        method: "DELETE"
    })
}