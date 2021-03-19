import { useDrag, useDrop } from 'react-dnd'

export const useSettingsDnD = (type, ref, id, index, callback) => {
    const [{ handlerId, isActive }, drop] = useDrop({
        accept: type,
        collect(monitor) {
            return { handlerId: monitor.getHandlerId() }
        },
        hover(item, monitor) {
            if (!ref.current) { return }

            const dragIndex = item.index
            const hoverIndex = index
            if (dragIndex === hoverIndex) { return }

            const hoverBoundingRect = ref.current?.getBoundingClientRect()
            const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2
            const clientOffset = monitor.getClientOffset()
            const hoverClientY = clientOffset.y - hoverBoundingRect.top

            if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) { return }
            if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) { return }

            callback(dragIndex, hoverIndex)
            item.index = hoverIndex
        }
    })
    const [{ isDragging }, drag] = useDrag({
        type: type,
        item: () => { return { id, index } },
        collect: (monitor) => ({
            isDragging: monitor.isDragging()
        })
    })

    drag(drop(ref))

    return { handlerId, isDragging, isActive }
}