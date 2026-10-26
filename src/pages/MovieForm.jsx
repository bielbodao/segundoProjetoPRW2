const fields = [
  { name: 'nome', label: 'Nome do filme', type: 'text', placeholder: 'Ex.: Clube da luta', maxLength: 120 },
  { name: 'genero', label: 'Gênero', type: 'text', placeholder: 'Ex.: Suspense', maxLength: 60 },
  { name: 'ano', label: 'Ano de lançamento', type: 'number', placeholder: 'Ex.: 1999', min: 1888, max: new Date().getFullYear() + 10 },
]

function MovieForm({ values, onChange, onSubmit, submitLabel, busy, onCancel }) {
  return (
    <form className="form-panel" onSubmit={onSubmit}>
      {fields.map((field) => (
        <label className="field" key={field.name}>
          <span>{field.label}</span>
          <input
            name={field.name}
            type={field.type}
            placeholder={field.placeholder}
            value={values[field.name]}
            onChange={onChange}
            required
            maxLength={field.maxLength}
            min={field.min}
            max={field.max}
          />
        </label>
      ))}
      <div className="form-actions">
        <button className="button button-primary" type="submit" disabled={busy}>
          {busy ? 'Salvando...' : submitLabel}
        </button>
        {onCancel && (
          <button className="button button-secondary" type="button" onClick={onCancel} disabled={busy}>
            Cancelar
          </button>
        )}
      </div>
    </form>
  )
}

export default MovieForm