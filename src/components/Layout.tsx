import { Outlet } from 'react-router-dom';
import { BottomNav } from './BottomNav';
import { FilterModal } from './FilterModal';

export function Layout() {
  return (
    <div className="min-h-screen bg-[#F5F5F7]">
      <div className="max-w-[430px] mx-auto min-h-screen pb-20">
        <Outlet />
      </div>
      <BottomNav />
      <FilterModal />
    </div>
  );
}
