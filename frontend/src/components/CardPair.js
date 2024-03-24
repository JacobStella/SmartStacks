const TermDefinitionPair = ({ number }) => (
    <div className="term-definition-pair">
      <div className="number">{number}</div>
      <input type="text" placeholder="Enter term" className="term-input" />
      <input type="text" placeholder="Enter definition" className="definition-input" />
      <div className="image-placeholder">IMAGE</div>
    </div>
  );
  