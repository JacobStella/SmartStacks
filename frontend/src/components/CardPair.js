const CardPair = ({ number, onDelete, onMove }) => (
    <div className="card-pair">
      <div className="card-pair-header">
        <div className="card-pair-number">{number}</div>
        <div className="card-pair-actions">
          <button onClick={() => onMove('up')} className="move-button">↑</button>
          <button onClick={() => onMove('down')} className="move-button">↓</button>
          <button onClick={onDelete} className="delete-button">🗑️</button>
        </div>
      </div>
      <div className="card-pair-body">
        <input type="text" placeholder="Enter term" className="term-input" />
        <div className="divider"></div>
        <input type="text" placeholder="Enter definition" className="definition-input" />
        <div className="image-upload-button">IMAGE</div>
      </div>
    </div>
  );
  