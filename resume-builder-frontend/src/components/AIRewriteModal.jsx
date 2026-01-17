const AIRewriteModal = ({ preview, onApply, onClose }) => {
  if (!preview) return null;

  return (
    <div
      className="modal fade show d-block"
      tabIndex="-1"
      style={{ backgroundColor: "rgba(0,0,0,0.6)" }}
    >
      <div className="modal-dialog modal-lg modal-dialog-centered modal-dialog-scrollable">
        <div className="modal-content bg-dark text-light">

          <div className="modal-header border-secondary">
            <h5 className="modal-title">AI Rewritten Resume Preview</h5>
            <button
              type="button"
              className="btn-close btn-close-white"
              onClick={onClose}
            />
          </div>

          <div className="modal-body">
            <pre className="bg-black text-success p-3 rounded">
              {JSON.stringify(preview, null, 2)}
            </pre>
          </div>

          <div className="modal-footer border-secondary">
            <button className="btn btn-success" onClick={onApply}>
              Apply Changes
            </button>
            <button className="btn btn-secondary" onClick={onClose}>
              Cancel
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default AIRewriteModal;
