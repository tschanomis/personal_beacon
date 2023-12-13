import DashboardSearch from "./DashboardSearch"
import DashboardMap from "./DashboardMap"

export default function Map() {
  return (
    <>
      <DashboardSearch />
      <DashboardMap
      // items={manageDashboard.items}
      // addItem={addItem}
      // updateItem={updateItem}
      // removeItem={removeItem}
      // getItemIndex={getItemIndex}
      // displayReturn={displayReturn}
      // fromAddressBar={manageDashboard.fromAddressBar}
      // alert={props.alert}
      />
      <button className="Dashboard-display-info">+</button>
    </>
  )
}