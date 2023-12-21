const DropTarget = ({ status, onDrop }) => {
    const [{ isOver }, drop] = useDrop({
      accept: ItemType,
      drop: () => onDrop(),
      collect: (monitor) => ({
        isOver: !!monitor.isOver(),
      }),
    });
  
    const style = {
      height: "40px",
      border: 1px dashed ${isOver ? "red" : "#000"}, // Highlight the drop area when dragging over it
    };
  
    return <div ref={drop} style={style} />;
  };