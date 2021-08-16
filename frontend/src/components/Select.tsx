import ListData from "./ListData"

const Select = ({ className }: { className: string }) => {
    return (
        <div className={className}>
            <input list="pokemon-list" id="pokemon-choice"/>
            <ListData id="pokemon-list"/>
        </div>
    )
}

export default Select
    