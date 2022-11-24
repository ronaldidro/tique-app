import CustomTable from '../../components/admin/CustomTable'
import { useColumns, useRows } from '../../utils/tables'

const CategoryTable = () => {
  return <CustomTable title="Categorías" columns={useColumns()} data={useRows()} />
}

export default CategoryTable
