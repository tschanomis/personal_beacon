import DashboardSearch from "./DashboardSearch"
import DashboardMap from "./DashboardMap"

import { useOutletContext } from "react-router-dom"

export default function Map() {
  const [getAddress, manageDashboard, addItem, updateItem, removeItem, getItemIndex, displayReturn] = useOutletContext();
  return (
    <>
      <DashboardSearch getAddress={getAddress} />
      <DashboardMap
        items={manageDashboard.items}
        addItem={addItem}
        updateItem={updateItem}
        removeItem={removeItem}
        getItemIndex={getItemIndex}
        displayReturn={displayReturn}
        fromAddressBar={manageDashboard.fromAddressBar}
      // alert={props.alert}
      />
      {manageDashboard.displayMobileInfo ?
        null
        :
        <button className="Dashboard-display-info">+</button>
      }
    </>
  )
}