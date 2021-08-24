import ListData from "./ListData"

const Select = (
    { className, selected }: { className: string, selected: Function }
) => {

    const handleChange = (e: any) => {
        selected(e.target.value)
    }

    return (
        <div className={className}>
            <select
                id="pokemon-choice"
                onChange={handleChange}
            >
                <ListData id="pokemon-list" />
            </select>
        </div>
    )
}

export default Select
