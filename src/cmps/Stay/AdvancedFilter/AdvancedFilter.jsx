import React, { useEffect, useState } from "react";

import { Formik } from "formik";

import { AdvancedFilterIcon } from "../../../services/other/svg.service";
import ModalContainer from "../../General/ModalContainer";
import AdvancedFilterForm from "../../Forms/AdvancedFilterForm";
import { useSelector } from "react-redux";
import { stayService } from "../../../services/stay/stay.service";
import { getTotalStaysFiltered } from "../../../store/actions/stay.actions";

function AdvancedFilter({ onSetFilter, filterBy }) {
  const totalStays = useSelector((state) => state.stayModule.totalFiltered);
  const [initialValues, setInitialValues] = useState({
    ...stayService.getDefaultFilter(),
  });
  const [countDiff, setCountDiff] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  useEffect(() => {
    const countDiff = stayService.countChangedFilters(filterBy, initialValues);
    setCountDiff(countDiff);
    setInitialValues({ ...filterBy });
  }, [filterBy]);

  const submitText =
    totalStays === 0 ? `No exact matches` : `Show ${totalStays} places`;

  return (
    <div className="advanced-filter">
      <div className="advanced-filter--filters-button">
        <button onClick={handleOpenModal}>
          <span>
            <AdvancedFilterIcon /> Filters
          </span>
        </button>
        {countDiff > 0 && (
          <div className="advanced-filter--count-filters">{countDiff}</div>
        )}
      </div>
      {isModalOpen && (
        <Formik
          initialValues={initialValues}
          onSubmit={(values) => {
            onSetFilter(values);
            handleCloseModal();
          }}
        >
          {({ handleSubmit, setValues, values }) => {
            useEffect(() => {
              getTotalStaysFiltered(values);
            }, [JSON.stringify(values)]);

            return (
              <ModalContainer
                headerTitle="Filters"
                onClose={handleCloseModal}
                footerContent={
                  <div className="advanced-filter-footer-content">
                    <button
                      className="advanced-filter-clear-button"
                      type="button"
                      onClick={() => {
                        const defaultFilters = stayService.getDefaultFilter();
                        getTotalStaysFiltered(defaultFilters);
                        setValues(defaultFilters);
                      }}
                    >
                      Clear all
                    </button>
                    <button
                      className="advanced-filter-submit-button"
                      type="submit"
                      onClick={handleSubmit}
                    >
                      {submitText}
                    </button>
                  </div>
                }
              >
                <AdvancedFilterForm />
              </ModalContainer>
            );
          }}
        </Formik>
      )}
    </div>
  );
}

export default AdvancedFilter;
