import React from "react";
import { cn } from "@/helpers/cn";

interface SubCategory {
    id: string;
    name: string;
}

interface TabsProps {
    subcategories: SubCategory[];
    onTabChange: (id: string | null) => void;
    activeTab: string | null;
}

const SubcategoryTabs: React.FC<TabsProps> = ({ subcategories, onTabChange, activeTab }) => {
    const handleTabClick = (id: string | null) => {
        onTabChange(id);
    };

    return (
        <div className="container_filter_tab">
            <div className="scrollable_tabs">
                {subcategories.length > 0 && (
                    <button
                        key="all"
                        className={cn("tab_item", { active: activeTab === null })}
                        onClick={() => handleTabClick(null)}
                    >
                        Всі
                    </button>
                )}
                {subcategories.map((subcategory) => (
                    <button
                        key={subcategory.id}
                        className={cn("tab_item", { active: activeTab === subcategory.id })}
                        onClick={() => handleTabClick(subcategory.id)}
                    >
                        {subcategory.name}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default SubcategoryTabs;
