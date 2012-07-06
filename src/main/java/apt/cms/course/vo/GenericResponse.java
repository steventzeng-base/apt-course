package apt.cms.course.vo;



import static com.google.common.base.Preconditions.*;
import static org.apache.commons.lang.StringUtils.*;

import com.google.common.base.Function;
import com.google.common.collect.Lists;
import com.google.common.collect.Maps;
import java.util.Collections;
import java.util.List;
import java.util.Map;

/**
 * A simple POJO that maps to the JSON structure of a JqGrid.
 * <p>
 * The property names of this POJO must match the property names of your
 * JqGrid's jsonReader.
 */
public class GenericResponse {

    /**
     * Current page of the query
     */
    private final int pageNo;

    /**
     * Total number of records for the query
     */
    private final int pageSize;

    /**
     * Total number of records for the all data
     */
    private final int totalRows;

    /**
     * Total pages for the query
     */
    private final int totalPages;

    private final Map<String, String> userData;

    /**
     * An array that contains the actual objects
     **/
    private final List<Map<String, Object>> rows;

    /**
     * response message
     */
    private final String message;

    private GenericResponse(int pageNo, int pageSize, int totalRows, int totalPages, List<Map<String, Object>> rows, String message, Map<String, String> userData) {
        this.pageNo = pageNo;
        this.pageSize = pageSize;
        this.totalRows = totalRows;
        this.totalPages = totalPages;
        this.rows = rows;
        this.message = message;
        this.userData = userData;
    }

    public List<Map<String, Object>> getRows() {
        return rows;
    }

    public int getPageNo() {
        return pageNo;
    }

    public int getPageSize() {
        return pageSize;
    }

    public int getTotalPages() {
        return totalPages;
    }

    public int getTotalRows() {
        return totalRows;
    }

    public String getMessage() {
        return message;
    }

    public Map<String, String> getUserData() {
        return userData;
    }

    public static class Builder {

        private String errorMessage = "";

        private int pageNo;

        private int pageSize;

        private int totalRows;

        private Map<String, String> userData = Collections.emptyMap();

        private List<Map<String, Object>> rows = Collections.emptyList();

        public Builder() {
        }

        public Builder withErrorMessage(String error) {
            this.errorMessage = error;
            return this;
        }

        public Builder withPageNo(int pageNo) {
            checkArgument(pageNo > 0);
            this.pageNo = pageNo;
            return this;
        }

        public Builder withPageSize(int pageSize) {
            checkArgument(pageSize > 0);
            this.pageSize = pageSize;
            return this;
        }

        public Builder withTotalRows(int totalRows) {
            checkArgument(totalRows >= 0);
            this.totalRows = totalRows;
            return this;
        }

        public Builder withRows(List<Map<String, Object>> rows) {
            this.rows = Lists.transform(rows, new Function<Map<String, Object>, Map<String, Object>>() {

                @Override
                public Map<String, Object> apply(Map<String, Object> map) {
                    return Maps.transformValues(map, new Function<Object, Object>() {

                        @Override
                        public Object apply(Object value) {
                            if (value == null || (value instanceof String && isBlank((String) value))) {
                                return "&nbsp;";
                            }
                            return value;
                        }
                    });
                }
            });
            return this;
        }

        public Builder withUserData(Map<String, String> userData) {
            this.userData = userData;
            return this;
        }

        public GenericResponse build() {
            final int totalPages = (int) Math.ceil(totalRows / (double) pageSize);
            final String message = rows.size() > 0 ? "查詢完成" :errorMessage;
            return new GenericResponse(pageNo, pageSize, totalRows, totalPages, rows, message, userData);
        }
    }
}
