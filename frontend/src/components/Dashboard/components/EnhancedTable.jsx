import React from "react";

import Checkbox from "@material-ui/core/Checkbox";
import MaUTable from "@material-ui/core/Table";
import PropTypes from "prop-types";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableFooter from "@material-ui/core/TableFooter";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TablePaginationActions from "./TablePaginationActions";
import TableRow from "@material-ui/core/TableRow";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import TableToolbar from "./TableToolbar";
import {
  useGlobalFilter,
  usePagination,
  useRowSelect,
  useSortBy,
  useTable
} from "react-table";
import axios from 'axios'
import { toast, ToastContainer } from "react-toastify";
import $ from "jquery";

const IndeterminateCheckbox = React.forwardRef(
  ({ indeterminate, ...rest }, ref) => {
    const defaultRef = React.useRef();
    const resolvedRef = ref || defaultRef;

    React.useEffect(() => {
      resolvedRef.current.indeterminate = indeterminate;
    }, [resolvedRef, indeterminate]);

    return (
      <>
        <Checkbox ref={resolvedRef} {...rest} />
      </>
    );
  }
);


let notify = (type, message) => {
  switch (type) {
    case "success":
      toast.success(message, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: false,
        pauseOnFocusLoss: false,
      });
      break;
    case "error":
      toast.error(message, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: false,
        pauseOnFocusLoss: false,
      });
      break;

    default:
      toast.error(message, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: false,
        pauseOnFocusLoss: false,
      });
      break;
  }
};



const inputStyle = {
  padding: 0,
  margin: 0,
  border: 0,
  background: "transparent"
};

let obj = {}
// Create an editable cell renderer
const EditableCell = ({
  value: initialValue,
  row,
  column: { id },
  updateMyData, // This is a custom function that we supplied to our table instance
  editableRowIndex // index of the row we requested for editing
}) => {
  // We need to keep and update the state of the cell normally
  const [value, setValue] = React.useState(initialValue);

  const onChange = (e) => {
    if(id == "id_role"){
      setValue(e.target.options[e.target.selectedIndex].value)
    } else {

    setValue(e.target.value)
    }
  };

  // We'll only update the external data when the input is blurred
  const onBlur = () => {
    obj[id] = value;
    if(id == "email" && !value.includes("@")){
      setValue(row["original"].email)
      notify("error", "You need to input a correct email")
    } else {
      updateMyData(row, id, obj);
    }

  };

  const onSelect = () => {
    $(function () {
      $("input[data-relmax]").each(function () {
        var oldVal = $(this).prop("value");
        var relmax = $(this).data("relmax");
        var max = new Date();
        max.setFullYear(max.getFullYear() + relmax);
        $.prop(this, "max", $(this).prop("valueAsDate", max).val());
        $.prop(this, "value", oldVal);
      });
    });
  }


  // If the initialValue is changed externall, sync it up with our state
  React.useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  return row.index === editableRowIndex ? id == "date_of_birth" ? (
    <input className="form-control" type="date" data-relmax="-18" pattern="\d{4}-\d{2}-\d{2}" value={value} onSelect={onSelect} onChange={onChange} onBlur={onBlur}/>
  ) : id == "email" ? (
    <input className="form-control" type="email" maxLength="100" minLength="1" value={value} onChange={onChange} onBlur={onBlur}/>
  ) : id == "id_role" ? (
    <select className="form-select " style={{width: "0 !important"}} onSelect={onSelect} onChange={onChange} onBlur={onBlur} aria-label=".form-select-sm example">
      <option selected></option>
      <option value="1">1 - Member</option>
      <option value="2">2 - Moderator</option>
      <option value="3">3 - Administrator</option>
    </select>
  ) : (
    <input className="form-control" maxLength="50" minLength="5" value={value} onChange={onChange} onBlur={onBlur}/>
  ) : (
    <p>{value}</p>
  );

};

EditableCell.propTypes = {
  cell: PropTypes.shape({
    value: PropTypes.any.isRequired
  }),
  row: PropTypes.shape({
    index: PropTypes.number.isRequired
  }),
  column: PropTypes.shape({
    id: PropTypes.number.isRequired
  }),
  updateMyData: PropTypes.func.isRequired
};

// Set our editable cell renderer as the default Cell renderer
const defaultColumn = {
  Cell: EditableCell
};

const EnhancedTable = ({
  columns,
  data,
  setData,
  updateMyData,
  skipPageReset
}) => {
  const [editableRowIndex, setEditableRowIndex] = React.useState(null);

  const {
    getTableProps,
    headerGroups,
    prepareRow,
    page,
    gotoPage,
    setPageSize,
    preGlobalFilteredRows,
    setGlobalFilter,
    selectedFlatRows,
    state: { pageIndex, pageSize, selectedRowIds, globalFilter }
  } = useTable(
    {
      columns,
      data,
      defaultColumn,
      autoResetPage: !skipPageReset,
      // updateMyData isn't part of the API, but
      // anything we put into these options will
      // automatically be available on the instance.
      // That way we can call this function from our
      // cell renderer!
      updateMyData,
      // pass state variables so that we can access them in edit hook later
      editableRowIndex,
      setEditableRowIndex // setState hook for toggling edit on/off switch
    },
    useGlobalFilter,
    useSortBy,
    usePagination,
    useRowSelect,
    (hooks) => {
      hooks.allColumns.push((columns) => [
        {
          id: "selection",
          Header: ({ getToggleAllRowsSelectedProps }) => (
            <div>
              <IndeterminateCheckbox {...getToggleAllRowsSelectedProps()} />
            </div>
          ),

          Cell: ({ row }) => (
            <div>
              <IndeterminateCheckbox {...row.getToggleRowSelectedProps()} />
            </div>
          )
        },
        ...columns,
        // pass edit hook
        {
          accessor: "edit",
          id: "edit",
          Header: "Edit",
          Cell: ({ row, setEditableRowIndex, editableRowIndex }) => (
            <button
              type="submit"
              className="action-button btn btn-light"
              onClick={(e) => {
                e.preventDefault()
                obj = {}
                const currentIndex = row.index;
                if (editableRowIndex !== currentIndex) {
                  setEditableRowIndex(currentIndex);
                } else {
                  setEditableRowIndex(null);

                  notify("success", "Updated Successfully", "update");
                }
              }}
            >
              {/* single action button supporting 2 modes */}
              {editableRowIndex !== row.index ? <i className="ms-1 fa-solid fa-pencil"></i> : <i className="fa-solid fa-circle-check"></i>}
            </button>
          )
        }
      ]);
    }
  );

  const handleChangePage = (event, newPage) => {
    gotoPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setPageSize(Number(event.target.value));
  };

  const deleteUserHandler = (event) => {
    for (let i = 0; i < selectedFlatRows.length; i++) {
      axios
      .delete(`https://andresousa.pt/api/v1/user/${selectedFlatRows[i]["original"].id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      })
      .then((res) => {
        notify("success", res.data["message"], "bb");
        setInterval(() => {
          document.location.href = "/dashboard";
        }, 1000);
      })
      .catch((error) => {
        if (!error.response) {
          notify("error", `❌ Couldn't get a connection with the API!`, "cc");
          notify(
            "error",
            "❌ If the error persists contact support@andresousa.pt",
            "ee"
          );
          return;
        }
        if (error.response.status === 400 || error.response.status === 401) {
          if (error.response.data["message"] == "Password doesn't match") {
            notify(
              "error",
              `❌ Current ${error.response.data["message"]}`,
              "dd"
            );
            return;
          } else {
            notify("error", `❌ ${error.response.data["message"]}`, "gg");
            return;
          }
        }
      });
    }

    // setData(newData);
  };

  const addUserHandler = (user) => {
    const newData = data.concat([user]);
    setData(newData);
  };

  // Render the UI for your table
  return (
    <TableContainer
    id="users">
      <TableToolbar
        numSelected={Object.keys(selectedRowIds).length}
        deleteUserHandler={deleteUserHandler}
        addUserHandler={addUserHandler}
        preGlobalFilteredRows={preGlobalFilteredRows}
        setGlobalFilter={setGlobalFilter}
        globalFilter={globalFilter}
      />
      <MaUTable {...getTableProps()}>
        <TableHead>
          {headerGroups.map((headerGroup) => (
            <TableRow {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <TableCell
                  {...(column.id === "selection"
                    ? column.getHeaderProps()
                    : column.getHeaderProps(column.getSortByToggleProps()))}
                >
                  {column.render("Header")}
                  {column.id !== "selection" ? (
                    <TableSortLabel
                      active={column.isSorted}
                      // react-table has a unsorted state which is not treated here
                      direction={column.isSortedDesc ? "desc" : "asc"}
                    />
                  ) : null}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableHead>
        <TableBody>
          {page.map((row, i) => {
            prepareRow(row);
            return (
              <TableRow {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return (
                    <TableCell {...cell.getCellProps()}>
                      {cell.render("Cell")}
                    </TableCell>
                  );
                })}
              </TableRow>
            );
          })}
        </TableBody>

        <TableFooter>
          <TableRow>
            <TablePagination
              rowsPerPageOptions={[
                5,
                10,
                25,
                { label: "All", value: data.length }
              ]}
              colSpan={10}
              count={data.length}
              rowsPerPage={pageSize}
              page={pageIndex}
              SelectProps={{
                inputProps: { "aria-label": "rows per page" },
                native: true
              }}
              onChangePage={handleChangePage}
              onChangeRowsPerPage={handleChangeRowsPerPage}
              ActionsComponent={TablePaginationActions}
            />
          </TableRow>
        </TableFooter>
      </MaUTable>
    </TableContainer>
  );
};


EnhancedTable.propTypes = {
  columns: PropTypes.array.isRequired,
  data: PropTypes.array.isRequired,
  updateMyData: PropTypes.func.isRequired,
  setData: PropTypes.func.isRequired,
  skipPageReset: PropTypes.bool.isRequired
};

export default EnhancedTable;
